import type { Customer } from "../types";

export function getCustomers() {
    return fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
    .then(response => {
    if (!response.ok)
        throw new Error("Error when fetching customers: " + response.statusText);
    return response.json();
    })
    }

    export function deleteCustomer(url: string) {
    return fetch(url, {method: "DELETE"})
    .then(response => {
    if (!response.ok)
        throw new Error("Error when deleting customers " + response.statusText)
    return;
    })
    }

    export function saveCustomer(customer: Customer) {
        return fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers',
        {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify(customer)
            }
        )
        .then(response => {
        if (!response.ok)
            throw new Error("Error when saving customer: " + response.statusText);
        return response.json();
    });
}
