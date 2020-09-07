import { LAppDelegate } from './lappdelegate';
import { LAppLive2DManager } from './lapplive2dmanager';
import * as LAppDefine from './lappdefine';
import React, { useState, useEffect } from 'react';
import './asset/index.css'

function ReactLive2d(props) {

    // 好看颜色列表
    // green: '#B4DEAE',
    // DeepBlue: '#5B8DBE',
    // LightBlue: '#C8E6FE',
    // pink: '#F9B8BE'

    // 容器样式
    let containerStyle = {
        position: 'fixed',
        top: props.top ? props.top : '',
        right: props.right ? props.right : '0',
        bottom: props.bottom ? props.bottom : '0',
        left: props.left ? props.left : ''
    }
    // canvas样式
    let canvasStyle = {
        position: 'relative',
        top: props.top ? props.top : '',
        right: props.right ? props.right : '0',
        bottom: props.bottom ? props.bottom : '0',
        left: props.left ? props.left : ''
    }
    // 对话框样式
    let printStyle = {
        position: 'absolute',
        width: props.width > 300 ? props.width / 2 : '150px',
        left: props.width > 300 ? (props.width - props.width / 2) / 2 + 'px' : (props.width - 150) / 2 + 'px',
        top: '0',
        minHeight: '20px',
        display: 'block',
        borderRadius: '5px',
        border: '1px dashed #ccc',
        padding: '5px',
        background: props.color ? props.color : '#C8E6FE',
        display: 'none',
    }

    // 面板主题样式
    let Theme = {
        color: props.color ? props.color : '#C8E6FE',
        width: '30px',
        height: '30px',
    }

    let timer = null;

    const [controllerOn, setControllerOn] = useState(false)

    const [controllerIn, setControllerIn] = useState(false)

    const [printMenu, setPrintMenu] = useState(false)

    // 进入显示控制台
    function cvMouseOver() {
        setControllerOn(true)
    }

    function cvMouseOut() {
        timer = setTimeout(() => {
            // 0.01秒内没有进入点击面板，说明已经鼠标离开
            if (!controllerIn) {
                setControllerOn(false)
                setControllerIn(false)
            }
        }, 10);
    }

    // 进入选择菜单
    function ctMouseOver() {
        setControllerIn(true)
        clearTimeout(timer)
    }

    // 离开选择菜单
    function ctMouseOut() {
        setControllerIn(false)
    }

    //切换
    function ctTab() {
        LAppLive2DManager.getInstance().nextScene();
    }

    // 悬停菜单时的对白
    function talkPrint(print) {
        let printNow = document.getElementById('live2d-print');
        printNow.innerHTML = print;
        printNow.style.display = 'block';
    }

    function cancelPrint() {
        let printNow = document.getElementById('live2d-print');
        printNow.innerHTML = '';
        printNow.style.display = 'none';
    }

    useEffect(() => {
        console.log('props', props)

        props.ModelList ? LAppDefine.lappdefineSet.setModelDir(props.ModelList) : LAppDefine.lappdefineSet.setModelDir([])
        props.TouchBody ? LAppDefine.lappdefineSet.setHitBody(props.TouchBody) : LAppDefine.lappdefineSet.setHitBody([])
        props.TouchHead ? LAppDefine.lappdefineSet.setHitHead(props.TouchHead) : LAppDefine.lappdefineSet.setHitHead([])
        props.PathFull ? LAppDefine.lappdefineSet.setPathFull(props.PathFull) : LAppDefine.lappdefineSet.setPathFull('')

        if (!navigator.userAgent.match(/mobile/i) || props.MobileShow == true) {

            if (LAppDelegate.getInstance().initialize() == false) {
                return;
            }

            LAppDelegate.getInstance().run();


            window.onbeforeunload = () => LAppDelegate.releaseInstance();
        }

    }, []);

    return (
        <div>
            <div
                style={containerStyle}
                width={props.width ? props.width : '300'}
                height={props.height ? props.height : '500'}
                id="live2d-container">
                <div id="live2d-print"
                    style={printStyle}
                ></div>
                <canvas
                    id="live2d"
                    style={canvasStyle}
                    width={props.width ? props.width : '300'}
                    height={props.height ? props.height : '500'}
                    className="live2d"
                    onMouseEnter={cvMouseOver}
                    onMouseLeave={cvMouseOut}
                >

                </canvas>
                {controllerOn && (!props.menuList || props.menuList.length>0) &&
                    <div
                        className="live2d-controller"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                        }}
                        onMouseEnter={ctMouseOver}
                        onMouseLeave={ctMouseOut}
                    >
                        {(!props.menuList || props.menuList.indexOf('Mtab')>-1) &&
                            <div
                                className="iconfont"
                                style={Theme}
                                onClick={ctTab}
                                onMouseEnter={()=>talkPrint('你想要换一个看板娘吗？')}
                                onMouseLeave={cancelPrint}
                            >&#xe7ca;</div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ReactLive2d