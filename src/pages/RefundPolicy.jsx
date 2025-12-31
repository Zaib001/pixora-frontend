import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, RefreshCw, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RefundPolicy() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    {t("common.backToHome")}
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div className="text-center mb-16">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
                            <ShieldCheck size={32} className="text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
                            {t("refundPolicy.title")}
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            {t("refundPolicy.subtitle")}
                        </p>
                    </div>

                    <div className="grid gap-8">
                        {/* 1. Credit Refunds */}
                        <section className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                                    <RefreshCw size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">{t("refundPolicy.creditPurchase.title")}</h2>
                                    <p className="text-gray-400 leading-relaxed mb-4">
                                        {t("refundPolicy.creditPurchase.desc1")}
                                    </p>
                                    <p className="text-gray-400 leading-relaxed">
                                        {t("refundPolicy.creditPurchase.desc2")}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 2. Generation Failures */}
                        <section className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-500/20 rounded-xl text-red-400">
                                    <RefreshCw size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">{t("refundPolicy.generationFailures.title")}</h2>
                                    <p className="text-gray-400 leading-relaxed">
                                        {t("refundPolicy.generationFailures.desc")}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Subscriptions */}
                        <section className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                    <RefreshCw size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">{t("refundPolicy.subscriptions.title")}</h2>
                                    <p className="text-gray-400 leading-relaxed mb-4">
                                        {t("refundPolicy.subscriptions.desc1")}
                                    </p>
                                    <p className="text-gray-400 leading-relaxed">
                                        {t("refundPolicy.subscriptions.desc2")}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="text-center pt-8">
                            <h3 className="text-xl font-bold text-white mb-4">{t("refundPolicy.contact")}</h3>
                            <a href="mailto:support@pixora.ai" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors">
                                <Mail size={18} />
                                {t("refundPolicy.contactBtn")}
                            </a>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
