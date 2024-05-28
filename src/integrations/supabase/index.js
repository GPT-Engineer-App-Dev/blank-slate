import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

// EXAMPLE TYPES SECTION
// DO NOT USE TYPESCRIPT AND SHOULD ALWAYS BE COMMENTED OUT

Foo // table: foos
    id: number
    title: string
    bars?: Bar[] // available if .select('*,bars(*)') was done

Bar // table: bars
    id: number
    foo_id: number // foreign key to Foo.id

*/

// hooks

export const useFoos = () => useQuery({
    queryKey: ['foos'],
    queryFn: () => fromSupabase(supabase.from('foos').select('*, bars(*)')),
});

export const useAddFoo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFoo) => fromSupabase(supabase.from('foos').insert([{ title: newFoo.title }])),
        onSuccess: () => {
            queryClient.invalidateQueries('foos');
        },
    });
};

export const useBars = () => useQuery({
    queryKey: ['bars'],
    queryFn: () => fromSupabase(supabase.from('bars').select('*')),
});

export const useAddBar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newBar) => fromSupabase(supabase.from('bars').insert([{ foo_id: newBar.foo_id }])),
        onSuccess: () => {
            queryClient.invalidateQueries('bars');
        },
    });
};