import Card from "react-bootstrap/Card";

function TextExample() {
  const jobs_list = [
    {
      title: "Hire IT Consultants",
      text: "We offer you to hire IT consultants and engineers who help you overcome technical challenges and streamline project workflow better.",
    },
    {
      title: "Web App Developers",
      text: "Hire developers from us who excel in building robust, scalable, and secure web apps for your business.",
    },
    {
      title: "Mobile App Developers",
      text: "Hire Indian programmers from us and build tailored native and hybrid mobile applications for your niche.",
    },
    {
      title: "Hire Cloud Developers",
      text: "Hire programmers online from us and build secure, scalable and interactive cloud-based web and mobile applications",
    },
  ];

  return (
    <>
      <div class="container">
        <div class="row">
          {jobs_list.map((item, index) => (
            <div class="col-md-3" key={index}>
              <Card
                style={{ width: "19rem", height: "15rem" }}
                class="card mb-3"
              >
                <Card.Body>
                  <Card.Title style={{ color: "black", fontSize: "bold" }}>
                    {item.title}
                  </Card.Title>
                  <Card.Text style={{ height: 120 }} class="mt-3">
                    {item.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TextExample;
