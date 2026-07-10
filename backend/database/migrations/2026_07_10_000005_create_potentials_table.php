<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('potentials', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('category_id')->constrained('categories')->restrictOnDelete();
            $table->string('title', 150)->index();
            $table->string('slug', 150)->unique();
            $table->text('description');
            $table->string('status', 20)->default('draft')->index();
            $table->foreignUuid('cover_image_id')->nullable()->constrained('media')->nullOnDelete();
            $table->foreignUuid('location_id')->constrained('locations')->cascadeOnDelete();
            $table->json('metadata')->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->foreignUuid('created_by_id')->constrained('users')->restrictOnDelete();
            $table->timestamps();
            $table->softDeletes()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('potentials');
    }
};
