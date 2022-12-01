const divStyle = 
{
    display: 'flex',
    alignItems: 'center',
    padding: 50
};

function Contact()
{
    return (
        <section className="bg-primary p-4 text-white">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
                <div style={divStyle}>
                    <h1 className="text-2xl font-bold">Contact Us:</h1>
                    <a href={"https://www.linkedin.com/in/alan-michael-64383b19a/"}>Alan Michael</a>
                    <a href={"https://www.linkedin.com/in/caroline-debbaruah/"}>Caroline DebBaruah</a>
                    <a href={"https://www.linkedin.com/in/gayathri-eleswarapu-1b3a97190/"}>Gayathri Eleswarapu</a>
                    <a href={"https://www.linkedin.com/in/kennethtang0/"}>Kenneth Tang</a>
                    <a href={"https://www.linkedin.com/in/liammeagher03/"}>Liam Meagher</a>
                </div>
            </div>
        </section>
    )
}
export default Contact;
