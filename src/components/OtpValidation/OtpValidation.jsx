import React, { useState, useEffect } from 'react';
import './OtpValidation.css';

const OtpValidation = ({ mobileNumber }) => {
    const [otp, setOtp] = useState(new Array(4).fill(''));
    const [timer, setTimer] = useState(30);
    const [resendActive, setResendActive] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setResendActive(true);
        }
    }, [timer]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleResend = () => {
        setOtp([...otp.map(() => '')]);
        setTimer(30);
        setResendActive(false);
        // Implement resend OTP logic here
    };

    return (
        <div className="otp-container">
            <div className="otp-form">
                <h1>OTP Verification</h1>
                <p>We Will send you a one time password on this mobile number <b>Mobile Number</b></p>
                <p>{mobileNumber}</p>
                <div className="otp-inputs">
                    {otp.map((data, index) => {
                        return (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                                style={{ backgroundColor: 'hwb(180 93% 5%)',borderColor:"rgb(35, 187, 184)",borderWidth:"2px",borderRadius:"50%"}}
                            />
                        );
                    })}
                </div>
                <p>{`00:${timer < 10 ? `0${timer}` : timer}`}</p>
                <p>
                    Do not send OTP? <button onClick={handleResend} disabled={!resendActive} className="resend-otp">Send OTP</button>
                </p>
                <button className="submit-btn">Submit</button>
            </div>
        </div>
    );
};

export default OtpValidation;
