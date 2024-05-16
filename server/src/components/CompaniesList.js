import Card from "react-bootstrap/Card";

function CompaniesList() {
  const companies_list = [
    {
      name: "IBM",
      link: "https://www.ibm.com/in-en",
      text: "International Business Machines Corporation (using the trademark IBM),nicknamed Big Blue,is an American multinational technology company headquartered in Armonk,New York.",
    },
    {
      name: "Infosys",
      link: "https://www.infosys.com/",
      text: "Infosys Limited is an Indian multinational information technology company that provides business consulting,information technology and outsourcing services.",
    },
    {
      name: "Apple",
      link: "https://www.apple.com/in/",
      text: "Apple Inc. is an American multinational corporation and technology company headquartered in Cupertino,California.It designs,develops,and sells consumer electronics.",
    },
    {
      name: "Accenture",
      link: "https://www.accenture.com/in-en",
      text: "Accenture plc is a US multinational professional services company based in Dublin,specializing in information technology (IT) services and consulting.",
    },
  ];
  return (
    <>
      <div class="container">
        <div class="row">
          {companies_list.map((item, index) => (
            <div class="col-md-3" key={index}>
              <Card
                style={{ width: "19rem", height: "20rem" }}
                class="card mb-3"
              >
                <Card.Body>
                  <Card.Title style={{ color: "black", fontSize: "bold" }}>
                    {item.name}
                  </Card.Title>
                  <Card.Text style={{ height: 200 }} class="mt-3">
                    {item.text}
                  </Card.Text>
                  <Card.Link href={item.link}>Company Link</Card.Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default CompaniesList;
