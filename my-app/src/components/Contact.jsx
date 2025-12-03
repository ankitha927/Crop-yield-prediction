import React from "react";

export default function Contact() {
  const teamMembers = [
    {
      name: "Ankitha R",
      email: "ankitha.22cs024@sode-edu.in",
      phone: "7411130899",
    },
    {
      name: "Bhagyashree",
      email: "bhagyashree.22cs038@sode-edu.in",
      phone: "8105052692",
    },
    {
      name: "K Harshitha Bhat",
      email: "harshitha.22cs069@sode-edu.in",
      phone: "9481952825",
    },
    {
      name: "Gurukiran",
      email: "gurukiran.22cs.60@sode-edu.in",
      phone: "8792522469",
    },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: "10px 10px",
        background: "linear-gradient(180deg, #e8fff2, #d6f5e5)",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: "42px",
          marginBottom: "40px",
          color: "#0a5a37",
          fontWeight: "800",
          letterSpacing: "1px",
        }}
      >
        Contact & Support Team
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          width: "100%",
          maxWidth: "1200px",
          padding: "10px",
        }}
      >
        {teamMembers.map((member, index) => (
          <div
            key={index}
            style={{
              padding: "25px",
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
              textAlign: "center",
              transition: "0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 12px 30px rgba(0, 0, 0, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(0, 0, 0, 0.15)";
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "85px",
                height: "85px",
                borderRadius: "50%",
                margin: "0 auto 15px auto",
                background: "linear-gradient(135deg, #0b9444, #067333)",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "30px",
                fontWeight: "700",
                letterSpacing: "1px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <h4
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#064d2b",
                marginBottom: "10px",
              }}
            >
              {member.name}
            </h4>

            <p style={{ fontSize: "16px", color: "#444", marginBottom: "6px" }}>
              📧 <strong>{member.email}</strong>
            </p>

            <p style={{ fontSize: "16px", color: "#444" }}>
              📞 <strong>{member.phone}</strong>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
