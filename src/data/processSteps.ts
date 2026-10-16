import contactPhoto from "@/assets/process/contact.jpg";
import consultationPhoto from "@/assets/process/consultation.png";
import tattooPhoto from "@/assets/process/tattoo.png";
import aftercarePhoto from "@/assets/process/aftercare.png";

// Dark steps sit on a photo background; plain steps are on the page color.
export const steps = [
  {
    id: "contact",
    title: "Contact",
    photo: contactPhoto,
    paragraphs: [
      "A scheduled consultation is always the best way to start. When we have time set aside just for your project, I can focus completely on your ideas, reference images, and design goals without distraction.",
      "That said, you’re always welcome to stop by the shop! If I’m available, I’m happy to take a few minutes to chat, answer quick questions, and then schedule a formal consultation so we can dive deeper into your vision.",
      'To schedule a consultation, please reach out through my <a href="/contact/">contact form</a> or by email at <a href="mailto:christianbiedetattoos@gmail.com">christianbiedetattoos@gmail.com</a>.',
      "I work with an assistant who helps coordinate every step of the tattoo process — from scheduling to final session prep. Once you reach out, my assistant will gather a few details about your design, placement, and availability so that we can make the most of our consultation time together.",
      "I look forward to connecting and bringing your next tattoo idea to life.",
    ],
  },
  {
    id: "consultation",
    title: "Consultation",
    photo: consultationPhoto,
    dark: true,
    paragraphs: [
      "Every great tattoo starts with a great conversation. During our consultation, we’ll take the time to get to know your ideas, your inspiration, and what you want your tattoo to represent. My goal is to create a piece that’s not only visually striking but also personal and meaningful to you.",
      "We’ll talk through design concepts, including overall style, color or black and gray preferences, and any reference images you’d like to share. We’ll also discuss placement, how it complements your body’s shape and flow, and how the tattoo will interact with any existing work you may have.",
      "In this meeting, we’ll also go over the creative process, including how I develop custom designs, what to expect before and during your session, and how much time your tattoo is estimated to take. You’ll have the opportunity to ask any questions about preparation, healing, or scheduling so you feel completely confident before we begin.",
      "A consultation is an important part of creating a tattoo that’s truly yours — a collaboration between your vision and my artistry.",
    ],
  },
  {
    id: "tattoo",
    title: "Tattoo",
    photo: tattooPhoto,
    paragraphs: [
      "When appointment day arrives, it’s time to bring your vision to life. By this point, your design will be finalized, your placement confirmed, and we’ll be ready to focus entirely on creating your piece.",
      "When you arrive, we’ll review the design together one more time to ensure every detail feels right. I’ll take time to prep the stencil or, for freehand pieces, sketch directly onto your skin to ensure the tattoo fits your body’s natural shape and movement perfectly.",
      "Once you’re comfortable and ready, we’ll begin. I take pride in creating an atmosphere that’s professional, calm, and focused — where you can relax, ask questions, or just enjoy the process. Whether it’s your first tattoo or your fiftieth, my goal is to make the experience as smooth and enjoyable as possible.",
      "Throughout the session, I’ll check in with you to make sure you’re doing well. Breaks are always welcome if you need them. Your comfort and well-being come first.",
      "After the tattoo is complete, I’ll carefully bandage your new piece with a second-skin style dressing (or another method if you have adhesive sensitivities) and go over the aftercare instructions to ensure your tattoo heals beautifully.",
    ],
  },
  {
    id: "aftercare",
    title: "Healing & Aftercare",
    photo: aftercarePhoto,
    dark: true,
    paragraphs: [
      "Your tattoo is a piece of art and like any work of art, it deserves proper care. I take healing seriously because how you care for your tattoo in the days following your appointment directly affects how it looks for years to come.",
      "Before we wrap your tattoo, please let me know if you have any allergies or sensitivities to medical tape or adhesives. If you don’t, I’ll apply a second-skin style bandage, a transparent dressing that protects your tattoo while it begins to heal. This bandage should stay on for at least 24 hours but ideally will stay in place for 5 days.",
      "During this time, you may notice fluid and what looks like ink collecting underneath the bandage and this is completely normal and even beneficial. That fluid is filled with healing cells that help your skin recover quickly and cleanly.",
      "Once it’s time to remove the bandage, wash the tattoo gently once a day using mild, unscented soap and warm water. Pat it completely dry with a clean paper towels, and then apply a very thin layer of an unscented lotion such as Eucerin (or a similar gentle moisturizer). Continue this routine for about 10 days after the bandage comes off.",
      "Your tattoo will likely peel or flake as it heals and that’s part of the process. Avoid scratching or picking, keep it clean, and let your skin do its thing.",
      "If you have any questions during healing, or something doesn’t look quite right, don’t hesitate to reach out. I’m always happy to help make sure your new tattoo heals beautifully.",
    ],
  },
];
