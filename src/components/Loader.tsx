export default function Loader() {
    return (
      <div className="loading-container">
        <div className="loader" style={{ borderWidth: '4px', borderStyle: 'solid', borderTopColor: '#3498db', borderRightColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}></div>
        <p>Loading...</p>
      </div>
    );
}
