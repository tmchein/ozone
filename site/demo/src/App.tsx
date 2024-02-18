import { Dropzone } from 'dropzone';

function App() {
  return (
    <div>
      <Dropzone
      acceptFileExtension=''
      uploadApiRoute='/'
        afterProcessed={(text) => {
          console.log(text);
        }}
      />
    </div>
  );
}

export default App;
