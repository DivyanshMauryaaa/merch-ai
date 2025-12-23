import { Check } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for testing the waters",
            features: ["3 Projects", "Basic Search Agent", "Access to Merch Agent v1", "4 folders", "CSV Export", "3 Searches per Research"],
            highlight: false,
        },
        {
            name: "Bronze",
            price: "$20",
            description: "For individuals and small teams",
            features: ["10 projects", "Access to Merch Agent v2", "Unlimited Folders", "CSV Export", "Maximum 15 Searches per Research"],
            highlight: true,
        },
        {
            name: "Platinum",
            price: "$40",
            description: "Best for growing businesses",
            features: ["Unlimited projects", "Access to Merch Agent v3", "Unlimited Folders", "Image Search", "CSV Export", "Maximum 35 Searches per Research"],
            highlight: false,
        },
        {
            name: "Diamond",
            price: "$60",
            description: "Maximum power and control",
            features: ["Unlimited Projects", "Access to the most advanced Merch Agent", "Unlimited Folders", "Image Search", "CSV Export", "Maximum 100 Searches per Research"],
            highlight: false,
        },
    ];

    return (
        <section className="py-20" id="pricing">
            <div className="text-center mb-16">
                <ScrollAnimation>
                    <h2 className="text-5xl font-bold mb-4 text-black">Simple, Transparent <span className="text-indigo-700">Pricing</span></h2>
                    <p className="text-xl text-gray-500">Choose the plan that fits your needs</p>
                </ScrollAnimation>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 px-4 md:px-8 max-w-[1600px] mx-auto">
                {plans.map((plan, index) => (
                    <ScrollAnimation
                        key={index}
                        delay={index * 0.1}
                        className={`
              relative flex flex-col p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2
              ${plan.highlight
                                ? "bg-indigo-700 text-white shadow-2xl shadow-indigo-200 border-none scale-105 z-10"
                                : "bg-white border border-gray-200 hover:shadow-xl hover:shadow-gray-100 text-black"
                            }
            `}
                    >
                        {plan.highlight && (
                            <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
                                <span className="bg-indigo-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Most Popular
                                </span>
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className={`text-xl font-semibold mb-2 ${plan.highlight ? "text-indigo-100" : "text-gray-900"}`}>{plan.name}</h3>
                            <div className="flex items-baseline mb-2">
                                <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                                <span className={`ml-2 text-sm ${plan.highlight ? "text-indigo-200" : "text-gray-500"}`}>/month</span>
                            </div>
                            <p className={`text-sm ${plan.highlight ? "text-indigo-100" : "text-gray-500"}`}>{plan.description}</p>
                        </div>

                        <ul className="flex-1 space-y-4 mb-8">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm">
                                    <Check className={`w-5 h-5 mr-3 shrink-0 ${plan.highlight ? "text-indigo-200" : "text-indigo-600"}`} />
                                    <span className={plan.highlight ? "text-indigo-50" : "text-gray-600"}>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`
                w-full py-3 px-6 rounded-full font-semibold transition-colors duration-200 cursor-pointer
                ${plan.highlight
                                    ? "bg-white text-indigo-700 hover:bg-gray-50"
                                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                                }
              `}
                        >
                            Coming soon
                        </button>
                    </ScrollAnimation>
                ))}
            </div>
        </section>
    );
}
