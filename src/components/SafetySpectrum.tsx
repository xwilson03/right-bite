export default function SafetySpectrum ({grade}: {grade: number}) {

    const good   = '#22c55e', bgGood = '#166534';
    const okay   = '#eab408', bgOkay = '#854d0e';
    const bad    = "#ef4444", bgBad  = "#991b1b";

    const bgColor = (grade < 40) ? bgGood : (grade < 70) ? bgOkay : bgBad;
    const fgColor = (grade < 40) ? good   : (grade < 70) ? okay   : bad;

    const risk    = (grade < 40) ? "Low" : (grade < 70) ? "Medium" : "High";
    const blurb   = (grade < 40) ? "This product is generally safe based on its ingredients."
                  : (grade < 70) ? "This product has some safety concerns."
                  : "This product may pose serious safety concerns.";

    return (
        <div className="w-2/3 py-4 px-8 rounded-lg" style={{ backgroundColor: bgColor }}>
            <h2 className="text-center font-semibold text-2xl text-white">
                Risk Factor: {risk}
            </h2>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-zinc-400">
                <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                    style={{
                        backgroundColor: fgColor,
                        width: grade.toString() + "%"
                    }}
                />
            </div>
            <p className="text-center text-lg text-zinc-400 mt-2">
                {blurb}
            </p>
        </div>
    );

}