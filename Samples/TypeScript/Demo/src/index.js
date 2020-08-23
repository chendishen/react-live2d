import { LAppDelegate } from './lappdelegate';
import { lappdefineSet } from './lappdefine';
import React, { useState, useEffect } from 'react';

function ReactLive2d(props) {
    let canvasStyle = {
        position : 'relative',
        top: props.top ? props.top : '',
        right: props.right ? props.right : '0',
        bottom: props.bottom ? props.bottom : '0',
        left: props.left ? props.left : ''
    }

    useEffect(() => {
        console.log('props', props)
        
        props.ModelList ? lappdefineSet.setModelDir(props.ModelList) : lappdefineSet.setModelDir([])

        
        if (LAppDelegate.getInstance().initialize() == false) {
            return;
        }

        LAppDelegate.getInstance().run();


        window.onbeforeunload = () => LAppDelegate.releaseInstance();

    }, []);
    return (
        <div>
            <canvas
                id="live2d"
                style={canvasStyle}
                width={props.width ? props.width : '300'}
                height={props.height ? props.height : '400'}
                className="live2d"
            ></canvas>
        </div>
    )
}

export default ReactLive2d