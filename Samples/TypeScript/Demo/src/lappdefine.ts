/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LogLevel } from '../Framework/src/live2dcubismframework'

/**
 * Sample Appで使用する定数
 */
// 画面
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

// 相対パス
export let ResourcesPath = './Resources/';
// 绝对路径，提供给SSR类型项目
// export let ResourcesPathFull = '';

// モデルの後ろにある背景の画像ファイル
export const BackImageName = 'back_class_normal.png';

// 切换
export const GearImageName = 'icon_gear.png';

// 終了ボタン
export const PowerImageName = 'CloseNormal.png';

// モデル定義---------------------------------------------
// モデルを配置したディレクトリ名の配列
// ディレクトリ名とmodel3.jsonの名前を一致させておくこと
export let ModelDir: string[] = ['Hiyori', 'Haru', 'Rice'];

// 外部定義ファイル（json）と合わせる
export const MotionGroupDefault = ''; // 默认的其他模型
export const MotionGroupIdle = 'Idle'; // アイドリング
export const MotionGroupTapBody = 'TapBody'; // 体をタップしたとき

// 外部定義ファイル（json）と合わせる
export const HitAreaNameHead = 'Head';
export const HitAreaNameBody = 'Body';

// 对话内容
export let HitBodyList: string[] = ['啊呀，你的手在摸哪里嘛~','哼，坏人'];
export let HitHeadList: string[] = ['讨厌~不要掐人家的脸嘛~','希望明天也能感受到你的触摸呢'];
export let HitDefaultList: string[] = ['今天又是开心的一天呢~','真是元气满满呀'];

// モーションの優先度定数
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

// デバッグ用ログの表示オプション
export const DebugLogEnable = true;
export const DebugTouchLogEnable = false;

// Frameworkから出力するログのレベル設定
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// デフォルトのレンダーターゲットサイズ
export const RenderTargetWidth = 1900;
export const RenderTargetHeight = 1000;

// 外部传入动态参数
export class lappdefineSet {
    // 模型列表
    public static setModelDir(modelDir:Array<string>): void {
        ModelDir = modelDir.length>0 ? modelDir : ModelDir
    }
    // 身体点击语言
    public static setHitBody(hitBodyList:Array<string>): void {
        HitBodyList = hitBodyList.length>0 ? hitBodyList : HitBodyList
    }
    // 头部点击语言
    public static setHitHead(hitHeadList:Array<string>): void {
        HitHeadList = hitHeadList.length>0 ? hitHeadList : HitHeadList
    }
    // 默认点击语言
    public static setHitDefault(hitDefaultList:Array<string>): void {
        HitDefaultList = hitDefaultList.length>0 ? hitDefaultList : HitDefaultList
    }
    // 模型绝对路径
    public static setPathFull(pathfull:string): void {
        ResourcesPath = pathfull.length>0 ? pathfull : ResourcesPath
    }
}
