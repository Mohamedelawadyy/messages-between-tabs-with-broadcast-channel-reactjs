import ChatContainer from "./components/ChatContainer";

function App() {
  return (
    <main>
      <h1>Broadcast Channel</h1>
      <p className="text">
        Open another tab and start sending messages between them.
      </p>
      <div className="form">
        <ChatContainer />
      </div>
    </main>
  );
}

export default App;
