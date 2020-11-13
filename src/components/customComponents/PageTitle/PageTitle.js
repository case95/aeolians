import React from 'react'

import './PageTitle.css'

const PageTitle = ({title, undertitle, text}) => {
  return (
    <div className="my-page-title">
      {title && <h1 className='my-title'>{title}</h1>}
      {undertitle && <h1 className='my-undertitle'>{undertitle}</h1>}
      {text && <p className='my-text'>{text}</p>}
    </div>
  )
}

export default PageTitle
