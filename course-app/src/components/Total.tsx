interface TotalProps {
  exercises: number;
}

const Total = (props: TotalProps): React.JSX.Element => {
  return (
    <div>
      <h2>
        Number of exercises: {props.exercises}
      </h2>
    </div>
  );
};

export default Total;
