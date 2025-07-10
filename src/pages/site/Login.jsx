import React from 'react';

const Login = () => {
    return (
        <>
            <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
        </>
    );
}

export default Login;