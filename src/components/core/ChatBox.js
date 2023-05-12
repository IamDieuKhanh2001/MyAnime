import { useEffect } from 'react';

export default function ChatRoom({ options }) {
  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]);

  return <h1>Welcome to the {options.roomId} room!</h1>;
}

export function createConnection({ serverUrl, roomId }) {
    // A real implementation would actually connect to the server
    if (typeof serverUrl !== 'string') {
      throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
    }
    if (typeof roomId !== 'string') {
      throw Error('Expected roomId to be a string. Received: ' + roomId);
    }
    return {
      connect() {
        console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
      },
      disconnect() {
        console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
      }
    };
  }