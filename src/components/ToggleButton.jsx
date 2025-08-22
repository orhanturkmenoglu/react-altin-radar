import React from 'react'

import "../css/About.css"

function ToggleButton({isOpen,onSelect}) {
  return (
    <button className='about-toggle-btn' onClick={onSelect}>
        {isOpen ? "Kapat":"Detay Göster"}
    </button>
  )
}

export default ToggleButton