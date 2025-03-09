export const ErrorScreen = () => {
  return (
    <div>
      <h1 style={{ marginTop: 300 }}>Error</h1>;
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </div>
  );
};
