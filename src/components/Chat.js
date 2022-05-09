function Chat(props) {
  function handleDelete() {
    console.log(props.id);
    props.deleteHandler(props.id);
  }
  return (
    <>
      <p>key: {props.id}</p>
      <p>name: {props.username}</p>
      <p>message {props.message}</p>
      <p>posted: {props.time}</p>
      <button onClick={handleDelete}> Delete Post</button>
      <span class="icon icon-calendar"></span>
    </>
  );
}

export default Chat;
