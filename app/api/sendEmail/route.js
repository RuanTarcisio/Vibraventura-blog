import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { nome, email, telefone, mensagem } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", 
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"Vibraventura" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_DESTINATION || process.env.EMAIL_USER,
      subject: "Vibraventura - Novo contato",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
          <h2 style="color: #0B3D91;">📬 Novo formulário de contato</h2>
          <hr style="border: 0; border-top: 2px solid #0B3D91; margin: 10px 0;" />
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${telefone || "Não informado"}</p>
          <hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0;" />
          <p><strong>Mensagem:</strong></p>
          <p style="background-color: #f4f4f4; padding: 10px; border-radius: 5px;">${mensagem}</p>
          <hr style="border: 0; border-top: 2px solid #0B3D91; margin: 10px 0;" />
          <p style="font-size: 0.9rem; color: #555;">Enviado pelo site Vibraventura</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ message: "Informações enviadas com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return Response.json({ message: "Erro ao enviar informações." }, { status: 500 });
  }
}
