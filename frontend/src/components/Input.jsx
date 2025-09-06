const Input = ({ icon: Icon, ...props }) => {
    return (
        <div className="relative mb-5">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="w-5 h-5 text-[#4c648c]" />
            </div>

            <input
                {...props}
                className="w-full pl-10 pr-3 py-2 bg-white/80 text-[#071741] placeholder-[#4c648c] border border-[#1853bd]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23bfd5] focus:border-[#23bfd5] transition"
            />
        </div>
    );
};

export default Input;
