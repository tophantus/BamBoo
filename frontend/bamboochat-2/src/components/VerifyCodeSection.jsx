import React, { useRef, useState } from 'react'

const VerifyCodeSection = ( {code, setCode} ) => {
    const inputsRef = useRef([])

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    }

    const handleBackspace = (e, index) => {
        if (e.key === "Delete") {
            e.preventDefault();
        }
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    }

    
  return (
    <div className='flex justify-center gap-2'>
        { code.map((digit, index) => (
            <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type='text'
                inputMode='numeric'
                maxLength={1}
                tabIndex={-1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-10 h-12 text-center border bg-textbox border-textbox rounded text-lg focus:outline-none focus:ring-2 focus:ring-bamboo"
            />
        ))
        
        }
    </div>
  )
}

export default VerifyCodeSection