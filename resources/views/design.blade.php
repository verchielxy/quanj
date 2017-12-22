@extends('html')


@section('html')
	<section class="section">
		<img class="img-res" src="/imgs/design/1.png" alt="">
		<div class="overlay" style="background-color: rgba(255,255,255,0.75);">
			<div class="display-table full-width full-height">
				<div class="display-tablecell">
					<div class="center">
						<h1 class="m0 font3em">优秀设计</h1>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section py2em mbg-gray">
		<div class="container">
			<div class="clearfix mb1em">
				<ul class="clearfix float-ul" role="tablist">
				    <li class="p1em" role="presentation" class="active">
				    	<a href="#home" aria-controls="home" role="tab" data-toggle="tab">
				    		<h4>大师作品</h4>
				    	</a>
				    </li>
				    <li class="p1em" role="presentation">
				    	<a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">
				    		<h4>设计案例</h4>
				    	</a>
				   	</li>
				</ul>
			</div>

			<div class="tab-content">
			    <div role="tabpanel" class="tab-pane fade in active" id="home">
			    	@php
			    		$rows=[
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    		];
			    	@endphp
					
					<div class="row">
			    		@foreach($rows as $key => $row)
				    		<div class="col-sm-4">
				    			<div class="px1em py2em">
				    				<div class="clearfix shadow-shallow">
				    					<img class="img-res" src="{{ $row[0] }}" alt="">
				    					<div class="bg-white p1em">
				    						<h4>{{ $row[1] }}</h4>
				    					</div>
				    				</div>
				    			</div>
				    		</div>
							
							@if( ($key+1)%3==0 )
								</div><div class="row">
							@endif

				    	@endforeach	
			    	</div>
			    </div>

			    <div role="tabpanel" class="tab-pane fade in" id="profile">
			    	@php
			    		$rows=[
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    			[
			    				'/imgs/design/2.png',
			    				'江南首府江南A户型',
			    			],
			    		];
			    	@endphp
					
					<div class="row">
			    		@foreach($rows as $key => $row)
				    		<div class="col-sm-4">
				    			<div class="px1em py2em">
				    				<div class="clearfix shadow-shallow">
				    					<img class="img-res" src="{{ $row[0] }}" alt="">
				    					<div class="bg-white p1em">
				    						<h4>{{ $row[1] }}</h4>
				    					</div>
				    				</div>
				    			</div>
				    		</div>
							
							@if( ($key+1)%3==0 )
								</div><div class="row">
							@endif

				    	@endforeach	
			    	</div>
			    </div>
			</div>
		</div>
	</section>
@endsection



@push('css2')
	<style type="text/css" media="screen">
		
	</style>
@endpush



@push('js2')
	<script type="text/javascript">
	$(function(){
		
	});
	</script>
@endpush