import React from 'react'

const Toaster = ({ position = "top-center", reverseOrder = false }) => {
  return (
    <div>
      <Toaster position={position} reverseOrder={reverseOrder} />
    </div>
  )
}

export default Toaster
