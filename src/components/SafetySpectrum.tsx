export default function SafetySpectrum ({grade}: {grade: number}) {

    const good   = '#22c55e', bgGood = '#166534';
    const okay   = '#eab308', bgOkay = '#854d0e';
    const bad    = "#ef4444", bgBad  = "#991b1b";

    const bgColor = (grade > 80) ? bgGood : (grade > 50) ? bgOkay : bgBad;
    const fgColor = (grade > 80) ? good   : (grade > 50) ? okay   : bad;

    const risk    = (grade > 80) ? "Low" : (grade > 50) ? "Medium" : "High";
    const blurb   = (grade > 80) ? "This product is generally safe based on its ingredients."
                  : (grade > 50) ? "This product has some safety concerns."
                  : "This product may pose serious safety concerns.";

    return (
        <div className="p-4 rounded-lg" style={{ backgroundColor: bgColor }}>
            <h2 className="text-center font-semibold text-2xl text-white pb-3">
                Risk Factor: {risk}
            </h2>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-zinc-300">
                <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                    style={{
                        backgroundColor: fgColor,
                        width: grade.toString() + "%"
                    }}
                />
            </div>
            <p className="text-center text-lg text-zinc-300 mt-2">
                {blurb}
            </p>
        </div>
    );

}