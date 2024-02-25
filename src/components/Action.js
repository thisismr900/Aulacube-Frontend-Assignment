import React from 'react'

const Action = ({
    handleClick,
    btnText,
    className
}) => {
  return (
    <div className={className} onClick={handleClick}>
        {btnText}
    </div>
  )
}

export default Action