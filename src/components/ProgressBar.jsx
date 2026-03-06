export default function ProgressBar({ name, percentCompleted }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-medium text-gray-700 truncate w-1/3">
                {name}
            </span>
            <div className="flex-1 flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                        className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${percentCompleted}%` }}
                    />
                </div>
                <span className="text-[10px] text-gray-400 font-mono w-8 text-right">
                    {percentCompleted}%
                </span>
            </div>
        </div>
    );
}