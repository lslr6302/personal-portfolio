function SkillPills({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="px-3 py-1 rounded-full text-sm border border-current/30">
          {item}
        </span>
      ))}
    </div>
  );
}

export default SkillPills