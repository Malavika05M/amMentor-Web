'use client'

interface TasksViewerProps {
    isMentor: boolean; 
    tasks: string[][]; 
    highted_task: number; 
    mentees: string[][][];
    onTaskClick: (taskId: string) => void;
    onMenteeClick: (taskId: string, menteeId: string) => void;
}

const TasksViewer = ({ isMentor, tasks, highted_task, onTaskClick }: TasksViewerProps) => {
    const toggleExpand = (index: number) => {
        if (isMentor) {
            // For mentors, use the task ID from the 4th element (index 3)
            const taskId = tasks[index][3] || tasks[index][0]; // fallback to first element if 4th doesn't exist
            onTaskClick(taskId);
        } else {
            // For mentees, use the task ID from the 4th element (index 3)
            const taskId = tasks[index][3] || tasks[index][0]; // fallback to first element if 4th doesn't exist
            onTaskClick(taskId);
        }
    };
    const getStatusStyle = (status: string) => {
        const s = status.toUpperCase();
        if (s.includes("REVIEWED")) return "bg-[#2A2400] text-[#FFC107] border-[#FFC107]/20";
        if (s.includes("SUBMITTED")) return "bg-[#002B11] text-[#00E676] border-[#00E676]/30";
        if (s.includes("IN PROGRESS")) return "bg-[#FFC107] text-black border-none";
        if (s.includes("NOT COMPLETED")) return "bg-[#2B0F0F] text-[#FF5252] border-[#FF5252]/20";
        return "bg-[#1A1A1A] text-gray-500 border-white/5";
    };
    
    return (
        <div className="flex flex-col gap-5 pb-10">
            {tasks.map((task) => {
                const [no, title, status, id, desc] = task;
                const isInProgress = status.toUpperCase() === "IN PROGRESS";

                return (
                    <div 
                        key={id}
                        onClick={() => onTaskClick(id)}
                        className={`relative group cursor-pointer rounded-2xl p-[1.5px] transition-all duration-500 ease-out
                            hover:scale-[1.01] active:scale-[0.99]
                            ${isInProgress 
                                ? "bg-gradient-to-r from-[#FFC107]/60 to-transparent" 
                                : "bg-white/5 hover:bg-gradient-to-r hover:from-white/20 hover:to-transparent"}`}
                    >
                        {/* Main Card Container */}
                        <div className={`flex items-center justify-between px-10 py-7 rounded-2xl bg-[#0F0F0F] transition-all duration-300
                            group-hover:bg-[#141414]
                            ${isInProgress ? "shadow-[0_0_25px_rgba(255,193,7,0.05)]" : ""}`}>
                            
                            <div className="flex items-center gap-10">
                                {/* Large Background Number - Animates color on hover */}
                                <span className={`text-5xl font-bold italic tracking-tighter transition-all duration-500 
                                    ${isInProgress 
                                        ? "text-[#FFC107] opacity-20" 
                                        : "text-white opacity-5 group-hover:text-[#FFC107] group-hover:opacity-10"}`}>
                                    {no}
                                </span>

                                {/* Task Info */}
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-[#FFC107] transition-colors duration-300">
                                        {title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-500 font-medium group-hover:text-gray-400 transition-colors">
                                        {desc || "No description provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Status Badge - Glows on parent hover */}
                            <div className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest border transition-all duration-500 group-hover:brightness-110 ${getStatusStyle(status)}`}>
                                <span>{status}</span>
                                {status.toUpperCase().includes("SUBMITTED") && <span className="text-sm">●</span>}
                                {status.toUpperCase().includes("IN PROGRESS") && <span className="animate-spin text-sm">↻</span>}
                                {status.toUpperCase().includes("NOT COMPLETED") && <span>🔒</span>}
                            </div>
                        </div>
                    </div>
                );
            })}
            
            <button className="flex items-center gap-2 mx-auto mt-6 text-gray-500 hover:text-[#FFC107] transition-all text-sm font-bold uppercase tracking-widest">
                View More Tasks <span className="animate-bounce">↓</span>
            </button>
        </div>
    );
};

export default TasksViewer;