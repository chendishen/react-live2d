import React,{ useState,useEffect} from 'react';
import ReactLive2d from '../../src/index.js';

 function App(props){
     
    const [release,setRelease] = useState(false)

    function handleClick() {
        setRelease(true)
        props.history.push({ pathname: "/Other" });
    }
    useEffect(() => {
        
    }, []);
    return(
        <div>
            <div>liv2d</div>
            <button type="button" onClick={handleClick}>
                Go normal page test
            </button>
            <ReactLive2d
                width={300}
                height={500}
                bottom={'10px'}
                right={'10px'}
                ModelList={['Haru','Hiyori']}
                TouchBody={['啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊你要干嘛','哼','坏人']}
                release={release}
             />
        </div>
    )
};
export default App