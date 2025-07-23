import ReflectionWritingArea from "../components/ReflectionWritingArea";

export default function ReflectionSpace({ saveReflection, goBack }) {
  const handleSave = (text) => {
    saveReflection(text);
  };

  return (
    <div>
      <ReflectionWritingArea onSave={handleSave} goBack={goBack} />
    </div>
  );
}
