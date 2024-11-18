import React from 'react';

export default function CustomScrollbar({ children, style }) {
    return (
        <div style={style} className='custom-scrollbar'>
            {children}
        </div>
    )
}
