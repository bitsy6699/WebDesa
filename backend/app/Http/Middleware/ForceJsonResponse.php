<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * ForceJsonResponse Middleware
 *
 * Enforces the API response format by modifying the request headers
 * to always expect JSON. This guarantees that validation exceptions,
 * authentication exceptions, and general errors are returned in JSON
 * format instead of HTML redirects.
 *
 * Applied strictly to API route groups, not globally.
 *
 * @see docs/development/CODING_RULES.md §4.5 Exception Handling
 */
class ForceJsonResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $request->headers->set('Accept', 'application/json');

        return $next($request);
    }
}
