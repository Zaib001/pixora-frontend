import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const GenerationProgress = ({ currentStage = 0 }) => {
    const stages = [
        { id: 0, label: "Initializing", description: "Preparing request..." },
        { id: 1, label: "Analyzing", description: "Understanding your prompt..." },
        { id: 2, label: "Synthesizing", description: "Generating frames..." },
        { id: 3, label: "Finalizing", description: "Processing output..." }
    ];

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Progress Bar */}
            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-600"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            {/* Stages */}
            <div className="grid grid-cols-4 gap-4">
                {stages.map((stage) => {
                    const isActive = currentStage === stage.id;
                    const isComplete = currentStage > stage.id;

                    return (
                        <div key={stage.id} className="flex flex-col items-center text-center space-y-2">
                            {/* Icon */}
                            <motion.div
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${isComplete
                                        ? "bg-green-500/20 border-green-500 text-green-400"
                                        : isActive
                                            ? "bg-purple-500/20 border-purple-500 text-purple-400"
                                            : "bg-white/5 border-white/10 text-gray-600"
                                    }`}
                                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                {isComplete ? (
                                    <Check size={20} />
                                ) : isActive ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    <span className="text-xs font-bold">{stage.id + 1}</span>
                                )}
                            </motion.div>

                            {/* Label */}
                            <div>
                                <p
                                    className={`text-xs font-bold ${isActive || isComplete ? "text-white" : "text-gray-600"
                                        }`}
                                >
                                    {stage.label}
                                </p>
                                {isActive && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-[10px] text-gray-400 mt-1"
                                    >
                                        {stage.description}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GenerationProgress;
