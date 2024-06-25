// PhysicsCanvas.js
import React, { useEffect } from 'react';
import setupPhysicsEngine from '../utils/PhysicsEngine';

const PhysicsCanvas = () => {
    useEffect(() => {
        setupPhysicsEngine();
    }, []);

    return <div id="physics-canvas" style={{ margin: '0 auto', marginTop: '50px' }}></div>;
};

export default PhysicsCanvas;
