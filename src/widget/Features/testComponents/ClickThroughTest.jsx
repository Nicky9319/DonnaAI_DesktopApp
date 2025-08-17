import React from 'react'
import HoverComponent from '../../common/components/HoverComponent'
import TestTargetComponent from './TestTargetComponent'

const ClickThroughTest = () => {
	return (
		<HoverComponent style={{ position: 'relative', width: '100%', height: '100vh' }}>
			{/* Test target component always clickable */}
			<HoverComponent>
				<TestTargetComponent />
			</HoverComponent>

			{/* Toggle button always visible */}
			<HoverComponent>
				<div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
					<button
						style={{
							padding: '10px 20px',
							backgroundColor: '#e74c3c',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
							fontWeight: 'bold',
							fontSize: '14px'
						}}
					>
						🔒 Hide Overlay
					</button>
					<div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
						Status: Overlay is blocking clicks
						<br />
						Target: Clickable
					</div>
				</div>
			</HoverComponent>

			{/* HoverComponent overlay always visible */}
			<HoverComponent
				style={{
					position: 'absolute',
					top: '200px',
					left: '50px',
					width: '300px',
					height: '200px',
					backgroundColor: 'rgba(52, 152, 219, 0.8)',
					border: '3px solid #2980b9',
					borderRadius: '10px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 5
				}}
			>
				<div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
					🛡️ HoverComponent Overlay
					<br />
					<small>This blocks clicks when visible</small>
				</div>
			</HoverComponent>
		</HoverComponent>
	)
}

export default ClickThroughTest
