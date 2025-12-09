export async function onRequestPost(context) {
    console.log("Received form submission:", context.request);
     try {
        await context.env.EMAIL_WORKER.sendEmail(context.request);

        return new Response('Form submitted successfully!', { status: 200 });
    } catch (error) {
        console.error('Error processing form submission:', error);
        return new Response('Error processing form submission', { status: 500 });
    }
}