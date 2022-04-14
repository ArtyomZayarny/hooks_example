import './App.css';
import useFetch from './hooks/useFetch';
import useInput from './hooks/useInput';

function App() {
  const { val, onChange, onBlur, error } = useInput('Hello world', true);
  const {
    loading,
    data,
    error: fetchError,
  } = useFetch('https://www.reddit.com/r/news.json');
  if (loading) return 'Loading....';
  if (fetchError) {
    return null;
  }
  return (
    <div className="App">
      <form>
        <input value={val} onChange={onChange} onBlur={onBlur} />
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </form>
      {JSON.stringify(data && data.dist)}
    </div>
  );
}

export default App;
