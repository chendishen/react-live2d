import React, { useEffect } from 'react';

function Other(props) {
  
  function handleClick() {
    props.history.push({ pathname: "/" });
  }
  return (
    <div className="App">
     
      <div>其他普通页面</div>
      
      <button type="button" onClick={handleClick}>
        Go to the Live2d components page
      </button>
    </div>
  );
}

export default Other;
