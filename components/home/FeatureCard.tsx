import { Zap } from "lucide-react";
import { useState } from "react";

export function FeatureCard({ icon: Icon, title, description, details }: {
    icon: React.ElementType,
    title: string,
    description: string,
    details: string[]
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 shadow-[0_0_15px_rgba(128,0,128,0.1)] hover:shadow-[0_0_30px_rgba(128,0,128,0.2)] transition-all duration-300">
            <Icon className="w-16 h-16 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-zinc-400 mb-4">{description}</p>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-purple-400 hover:text-purple-300 transition-colors"
            >
                {isExpanded ? 'Ver menos' : 'Ver mais'}
            </button>
            {isExpanded && (
                <ul className="mt-4 space-y-2 text-zinc-300">
                    {details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                            <Zap className="w-5 h-5 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                            <span>{detail}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}