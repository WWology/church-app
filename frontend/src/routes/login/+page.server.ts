import { fail, redirect, type RequestEvent } from "@sveltejs/kit";
import type { Actions, PageServerLoad, RouteParams } from "./$types";

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
    const {session} = await safeGetSession();

    if (session) {
        redirect(303, '/people')
    }

    return { url: url.origin }
}

export const actions: Actions = {
    default: async (event: RequestEvent<RouteParams, '/login'>) => {
        const {
            request,
            locals: { supabase }
        } = event;
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const validEmail = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)

        const password = formData.get("password") as string;

        if (!validEmail) {
            return fail(400, { errors: { email: true, message: "Please enter a valid email address." } })
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return fail(400, { errors: { message: "Could not log in with the provided credentials." } });
        }

        return {
            data
        }
    }
} satisfies Actions;
