import React from 'react';
import ReactDOM from 'react-dom';
import ReactLive2d from '../../src/index.js';

 function App(prop){
    return(
        <div>
            <div>liv2d</div>
            <ReactLive2d
                width={300}
                height={500}
                bottom={'10px'}
                right={'10px'}
                ModelList={['Haru']}
             />
        </div>
    )
};
ReactDOM.render(<App />, document.getElementById('root'))