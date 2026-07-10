<?php

namespace App\Http\Controllers\Api\V1;

use App\Traits\ApiResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;

/**
 * BaseController
 *
 * Base class for all API v1 controllers. Provides:
 * - Standardized API response methods via the ApiResponse trait
 * - Laravel authorization capabilities
 * - Laravel validation capabilities
 *
 * All controllers MUST extend this class.
 * Controllers MUST NOT contain business logic.
 * Business logic belongs only inside Service classes.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §4 Controller Layer Design
 * @see docs/development/CODING_RULES.md §4.1 Thin Controllers
 */
class BaseController extends Controller
{
    use ApiResponse;
    use AuthorizesRequests;
    use ValidatesRequests;
}
