<?php
declare(strict_types=1);

// BranchQuickLinks SDK utility: result_body

class BranchQuickLinksResultBody
{
    public static function call(BranchQuickLinksContext $ctx): ?BranchQuickLinksResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
