import './App.css';
import { useEffect, useState } from 'react';
//import useFetch from './hooks/useFetch';
//import useInput from './hooks/useInput';

function App() {
  const [val, setVal] = useState('Hello world');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });
  useEffect(() => {
    fetchNow('https://www.reddit.com/r/news.json');
  }, []);
  if (status.loading) return 'Loading....';
  if (status.fetchError) {
    return null;
  }
  const fetchNow = (url, options) => {
    setStatus({ loading: true });
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setStatus({ ...status, loading: false, data: res.data }).catch(
          (error) => {
            setStatus({ loading: false, error });
          }
        );
      });
  };
  const onChange = (e) => {
    if (error) setError(null);
    setVal(e.target.value);
  };
  const onBlur = (e) =>
    !e.target.value && e.target.required
      ? setError('This field is required')
      : null;

  return (
    <div className="App">
      <form>
        <input
          value={val}
          onChange={onChange}
          onBlur={onBlur}
          required={true}
        />
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </form>
      {JSON.stringify(status.data && status.data.dist)}
    </div>
  );
}
// function App() {
//   const { val, onChange, onBlur, error } = useInput('Hello world', true);
//   const {
//     loading,
//     data,
//     error: fetchError,
//   } = useFetch('https://www.reddit.com/r/news.json');
//   if (loading) return 'Loading....';
//   if (fetchError) {
//     return null;
//   }
//   return (
//     <div className="App">
//       <form>
//         <input value={val} onChange={onChange} onBlur={onBlur} />
//         {error && <span style={{ color: 'red' }}>{error}</span>}
//       </form>
//       {JSON.stringify(data && data.dist)}
//     </div>
//   );
// }

export default App;
