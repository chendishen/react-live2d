/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import csmString = csmstring.csmString;
import CubismModel = cubismmodel.CubismModel;
import csmVector = csmvector.csmVector;
import iterator = csmvector.iterator;
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import ACubismMotion = acubismmotion.ACubismMotion;

export namespace Live2DCubismFramework {
  /**
   * モーション再生の管理
   *
   * モーション再生の管理用クラス。CubismMotionモーションなどACubismMotionのサブクラスを再生するために使用する。
   *
   * @note 再生中に別のモーションが StartMotion()された場合は、新しいモーションに滑らかに変化し旧モーションは中断する。
   *       表情用モーション、体用モーションなどを分けてモーション化した場合など、
   *       複数のモーションを同時に再生させる場合は、複数のCubismMotionQueueManagerインスタンスを使用する。
   */
  export class CubismMotionQueueManager {
    /**
     * コンストラクタ
     */
    public constructor() {
      this._userTimeSeconds = 0.0;
      this._eventCallBack = null;
      this._eventCustomData = null;
      this._motions = new csmVector<CubismMotionQueueEntry>();
    }

    /**
     * デストラクタ
     */
    public release(): void {
      for (let i = 0; i < this._motions.getSize(); ++i) {
        if (this._motions.at(i)) {
          this._motions.at(i).release();
          this._motions.set(i, void 0);
          this._motions.set(i, null);
        }
      }

      this._motions = null;
    }

    /**
     * 指定动作的开始
     *
     * 开始指定的动作。如果已经有相同类型的动作，则对现有动作立结束标志，开始淡出。
     *
     * @param   motion              开始的动作
     * @param   autoDelete          删除播放结束的动作实例 true
     * @param   userTimeSeconds     增量时间的累计值[秒]
     * @return                      返回开始的动作的识别号码。用于判定个别动作是否结束的IsFinished（）参数。无法开始时为“-1”
     */
    public startMotion(
      motion: ACubismMotion,
      autoDelete: boolean,
      userTimeSeconds: number
    ): CubismMotionQueueEntryHandle {
      if (motion == null) {
        return InvalidMotionQueueEntryHandleValue;
      }

      let motionQueueEntry: CubismMotionQueueEntry = null;
      
      //如果已经有动作的话就立结束标志
      for (let i = 0; i < this._motions.getSize(); ++i) {
        motionQueueEntry = this._motions.at(i);
        if (motionQueueEntry == null) {
          continue;
        }

        motionQueueEntry.startFadeout(
          motionQueueEntry._motion.getFadeOutTime(),
          userTimeSeconds
        ); // 开始淡出并退出
      }

      motionQueueEntry = new CubismMotionQueueEntry(); // 退出时丢弃
      motionQueueEntry._autoDelete = autoDelete;
      motionQueueEntry._motion = motion;
      // console.log('eventCount',motion['_motionData'])
      // 添加超频动作拦截器，据测试，curveCount超过100的模型会导致动作异常,待修复 2020.9.11
      if(motion['_motionData']['curveCount']<100){
        this._motions.pushBack(motionQueueEntry);
      }

      return motionQueueEntry._motionQueueEntryHandle;
    }

    /**
     * 全てのモーションの終了の確認
     * @return true 全て終了している
     * @return false 終了していない
     */
    public isFinished(): boolean {
      // ------- 処理を行う -------
      // 既にモーションがあれば終了フラグを立てる

      for (
        let ite: iterator<CubismMotionQueueEntry> = this._motions.begin();
        ite.notEqual(this._motions.end());

      ) {
        let motionQueueEntry: CubismMotionQueueEntry = ite.ptr();

        if (motionQueueEntry == null) {
          ite = this._motions.erase(ite); // 削除
          continue;
        }

        const motion: ACubismMotion = motionQueueEntry._motion;

        if (motion == null) {
          motionQueueEntry.release();
          motionQueueEntry = void 0;
          motionQueueEntry = null;
          ite = this._motions.erase(ite); // 削除
          continue;
        }

        // ----- 終了済みの処理があれば削除する ------
        if (!motionQueueEntry.isFinished()) {
          return false;
        } else {
          ite.preIncrement();
        }
      }

      return true;
    }

    /**
     * 指定したモーションの終了の確認
     * @param motionQueueEntryNumber モーションの識別番号
     * @return true 全て終了している
     * @return false 終了していない
     */
    public isFinishedByHandle(
      motionQueueEntryNumber: CubismMotionQueueEntryHandle
    ): boolean {
      // 既にモーションがあれば終了フラグを立てる
      for (
        let ite: iterator<CubismMotionQueueEntry> = this._motions.begin();
        ite.notEqual(this._motions.end());
        ite.increment()
      ) {
        const motionQueueEntry: CubismMotionQueueEntry = ite.ptr();

        if (motionQueueEntry == null) {
          continue;
        }

        if (
          motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber &&
          !motionQueueEntry.isFinished()
        ) {
          return false;
        }
      }
      return true;
    }

    /**
     * 全てのモーションを停止する
     */
    public stopAllMotions(): void {
      // ------- 処理を行う -------
      // 既にモーションがあれば終了フラグを立てる

      for (
        let ite: iterator<CubismMotionQueueEntry> = this._motions.begin();
        ite.notEqual(this._motions.end());

      ) {
        let motionQueueEntry: CubismMotionQueueEntry = ite.ptr();

        if (motionQueueEntry == null) {
          ite = this._motions.erase(ite);

          continue;
        }

        // ----- 終了済みの処理があれば削除する ------
        motionQueueEntry.release();
        motionQueueEntry = void 0;
        motionQueueEntry = null;
        ite = this._motions.erase(ite); // 削除
      }
    }

    /**
         * 指定したCubismMotionQueueEntryの取得

         * @param   motionQueueEntryNumber  モーションの識別番号
         * @return  指定したCubismMotionQueueEntry
         * @return  null   見つからなかった
         */
    public getCubismMotionQueueEntry(
      motionQueueEntryNumber: any
    ): CubismMotionQueueEntry {
      //------- 処理を行う -------
      // 既にモーションがあれば終了フラグを立てる
      for (
        let ite: iterator<CubismMotionQueueEntry> = this._motions.begin();
        ite.notEqual(this._motions.end());
        ite.preIncrement()
      ) {
        const motionQueueEntry: CubismMotionQueueEntry = ite.ptr();

        if (motionQueueEntry == null) {
          continue;
        }

        if (
          motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber
        ) {
          return motionQueueEntry;
        }
      }

      return null;
    }

    /**
     * イベントを受け取るCallbackの登録
     *
     * @param callback コールバック関数
     * @param customData コールバックに返されるデータ
     */
    public setEventCallback(
      callback: CubismMotionEventFunction,
      customData: any = null
    ): void {
      this._eventCallBack = callback;
      this._eventCustomData = customData;
    }

    /**
     * モーションを更新して、モデルにパラメータ値を反映する。
     *
     * @param   model   対象のモデル
     * @param   userTimeSeconds   デルタ時間の積算値[秒]
     * @return  true    モデルへパラメータ値の反映あり
     * @return  false   モデルへパラメータ値の反映なし(モーションの変化なし)
     */
    public doUpdateMotion(
      model: CubismModel,
      userTimeSeconds: number
    ): boolean {
      let updated = false;

      // ------- 処理を行う --------
      // 既にモーションがあれば終了フラグを立てる

      for (
        let ite: iterator<CubismMotionQueueEntry> = this._motions.begin();
        ite.notEqual(this._motions.end());

      ) {
        let motionQueueEntry: CubismMotionQueueEntry = ite.ptr();

        if (motionQueueEntry == null) {
          ite = this._motions.erase(ite); // 削除
          continue;
        }

        const motion: ACubismMotion = motionQueueEntry._motion;

        if (motion == null) {
          motionQueueEntry.release();
          motionQueueEntry = void 0;
          motionQueueEntry = null;
          ite = this._motions.erase(ite); // 削除

          continue;
        }

        // ------ 値を反映する ------
        motion.updateParameters(model, motionQueueEntry, userTimeSeconds);
        updated = true;

        // ------ ユーザトリガーイベントを検査する ----
        const firedList: csmVector<csmString> = motion.getFiredEvent(
          motionQueueEntry.getLastCheckEventTime() -
            motionQueueEntry.getStartTime(),
          userTimeSeconds - motionQueueEntry.getStartTime()
        );

        for (let i = 0; i < firedList.getSize(); ++i) {
          this._eventCallBack(this, firedList.at(i), this._eventCustomData);
        }

        motionQueueEntry.setLastCheckEventTime(userTimeSeconds);

        // ------ 終了済みの処理があれば削除する ------
        if (motionQueueEntry.isFinished()) {
          motionQueueEntry.release();
          motionQueueEntry = void 0;
          motionQueueEntry = null;
          ite = this._motions.erase(ite); // 削除
        } else {
          ite.preIncrement();
        }
      }

      return updated;
    }
    _userTimeSeconds: number; // デルタ時間の積算値[秒]

    _motions: csmVector<CubismMotionQueueEntry>; // モーション
    _eventCallBack: CubismMotionEventFunction; // コールバック関数
    _eventCustomData: any; // コールバックに戻されるデータ
  }

  /**
   * イベントのコールバック関数を定義
   *
   * イベントのコールバックに登録できる関数の型情報
   * @param caller        発火したイベントを再生させたCubismMotionQueueManager
   * @param eventValue    発火したイベントの文字列データ
   * @param customData   コールバックに返される登録時に指定されたデータ
   */
  export interface CubismMotionEventFunction {
    (
      caller: CubismMotionQueueManager,
      eventValue: csmString,
      customData: any
    ): void;
  }

  /**
   * モーションの識別番号
   *
   * モーションの識別番号の定義
   */
  export declare type CubismMotionQueueEntryHandle = any;
  export const InvalidMotionQueueEntryHandleValue: CubismMotionQueueEntryHandle = -1;
}
