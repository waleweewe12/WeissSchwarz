import React from 'react';
import { Link, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap';

function RegisterStatus(){
    const { status } = useParams();
    return(
        <>
        {status === 'fail' &&
            <>
                <h1>Sorry, Register failed.</h1>
                <p>ขออภัยครับ, การสมัครสมาชิกเกิดข้อผิดพลาดขึ้น กรุณาสมัครสมาชิกใหม่อีกครั้ง ขอบคุณครับ</p>
                <Link to="/">
                    <Button variant="primary" style={{marginRight:'10px'}}>กลับหน้าแรก</Button>
                </Link>
                <Link to="/register">
                    <Button variant="danger">Register</Button>
                </Link>
            </>
        }
        {status === 'success' &&
            <>
                <h1>Register Success!</h1>
                <p>สมัครสมาชิกสำเร็จ กรุณา signin เพื่อทำการเข้าสู่ระบบอีกครั้ง</p>
                <Link to="/">
                    <Button variant="primary">Sign In</Button>
                </Link>
            </>
        }
        </>
    )
}

export default RegisterStatus;