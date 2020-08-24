import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';
import React, { useState, useEffect } from 'react';

function ReactLive2d(props) {
    // 好看颜色列表
    // green: '#B4DEAE',
    // DeepBlue: '#5B8DBE',
    // LightBlue: '#C8E6FE',
    // pink: '#F9B8BE'

    // 容器样式
    let containerStyle = {
        position : 'fixed',
        top: props.top ? props.top : '',
        right: props.right ? props.right : '0',
        bottom: props.bottom ? props.bottom : '0',
        left: props.left ? props.left : ''
    }
    // canvas样式
    let canvasStyle = {
        position : 'relative',
        top: props.top ? props.top : '',
        right: props.right ? props.right : '0',
        bottom: props.bottom ? props.bottom : '0',
        left: props.left ? props.left : ''
    }
    // 对话框样式
    let printStyle = {
        position: 'absolute',
        width: props.width > 300 ? props.width/2 : '150px',
        left: props.width > 300 ? (props.width - props.width/2)/2 : (props.width-150)/2,
        top: '0',
        minHeight: '20px',
        display: 'block',
        borderRadius: '5px',
        border: '1px dashed #ccc',
        padding: '5px',
        background: props.color ? props.color : '#C8E6FE',
        display: 'none',
    }

    useEffect(() => {
        console.log('props', props)
        
        props.ModelList ? LAppDefine.lappdefineSet.setModelDir(props.ModelList) : LAppDefine.lappdefineSet.setModelDir([])
        props.TouchBody ? LAppDefine.lappdefineSet.setHitBody(props.TouchBody) : LAppDefine.lappdefineSet.setHitBody([])
        props.TouchHead ? LAppDefine.lappdefineSet.setHitHead(props.TouchHead) : LAppDefine.lappdefineSet.setHitHead([])

        
        if (LAppDelegate.getInstance().initialize() == false) {
            return;
        }

        LAppDelegate.getInstance().run();


        window.onbeforeunload = () => LAppDelegate.releaseInstance();

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
                ></canvas>
            </div>
        </div>
    )
}

export default ReactLive2d