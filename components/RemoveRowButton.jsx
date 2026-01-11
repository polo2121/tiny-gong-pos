import React from 'react'
import { Button } from "./ui/button";


const RemoveRowButton = () => {
    return (
        <Button className="w-16 py-5 rounded-full border border-remove-300 bg-remove-200 shadow-drop-mobile-menu relative hover:bg-accent group cursor-pointer focus-visible:none will-change-transform transition-transform select-none touch-none animate-(--anim-bubble) active:animate-(--anim-bubble-press) bubble-button overflow-hidden">
            {/* Up Hightlight */}
            <svg
                className="absolute top-0.5 left-1.5 z-10"
                style={{ width: 10 }}
                viewBox="0 0 17 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    opacity="0.7"
                    d="M1.5 12C4.5 6 9 3 15.5003 1.5"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="bevel"
                />
            </svg>

            {/* SVG Remove Icon */}
            <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5769 2.77273L11.1923 9.21636C11.1716 9.56367 11.0169 9.89003 10.7598 10.1287C10.5027 10.3673 10.1628 10.5001 9.80954 10.5H3.19046C2.83721 10.5001 2.49726 10.3673 2.2402 10.1287C1.98314 9.89003 1.82842 9.56367 1.80769 9.21636L1.42308 2.77273M5.11538 5.27273L6.5 6.63636M6.5 6.63636L7.88462 8M6.5 6.63636L7.88462 5.27273M6.5 6.63636L5.11538 8M1.19231 2.77273H11.8077C12.1898 2.77273 12.5 2.46727 12.5 2.09091V1.18182C12.5 0.805455 12.1898 0.5 11.8077 0.5H1.19231C0.810154 0.5 0.5 0.805455 0.5 1.18182V2.09091C0.5 2.46727 0.810154 2.77273 1.19231 2.77273Z" stroke="#E9493D" strokeLinecap="round" strokeLinejoin="round" />
            </svg>


            {/* Down Highlight */}
            <svg
                className="absolute bottom-0.5 right-1.5"
                style={{ width: 10 }}
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    opacity="0.7"
                    d="M1.5 9.5C5.73077 8.55882 9.53846 6.67647 12.5 1.5"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="bevel"
                />
            </svg>
        </Button>
    )
}

export default RemoveRowButton